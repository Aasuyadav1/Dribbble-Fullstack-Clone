"use client";
import React, { useState, useEffect } from "react";
import parser from "html-react-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

const page = () => {
  const [prompt, setPrompt] = useState("");
  const [genData, setGenData] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
    if (!apiKey) return { success: false, error: "API key not found" };
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      let fullContent = "";
      const result = await model.generateContentStream(prompt);
      for await (const chunk of result.stream) {
        fullContent += chunk.text();
        setGenData(fullContent);
        console.log(fullContent);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Gemini</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit">Generate</button>
      </form>
      <p>{genData ? parser(genData) : "generating..."}</p>
    </div>
  );
};

export default page;

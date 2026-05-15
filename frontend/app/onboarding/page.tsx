"use client";

import { useState } from "react";
import api from "../../src/services/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    productName: "",
    website: "",
    description: "",
    targetAudience: "",
    competitors: "",
    brandTone: "",
    keywords: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/products/create", formData);

      toast.success("Onboarding completed successfully");

      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-zinc-900 p-8 rounded-2xl">
        <h1 className="text-4xl font-bold mb-8">
          Product Onboarding
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <input
            type="text"
            name="website"
            placeholder="Website URL"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none h-32"
            required
          />

          <input
            type="text"
            name="targetAudience"
            placeholder="Target Audience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <input
            type="text"
            name="competitors"
            placeholder="Competitors (comma separated)"
            value={formData.competitors}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <input
            type="text"
            name="brandTone"
            placeholder="Brand Tone (e.g. Professional, Funny)"
            value={formData.brandTone}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <input
            type="text"
            name="keywords"
            placeholder="Keywords (comma separated)"
            value={formData.keywords}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-zinc-800 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold p-4 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Onboarding"}
          </button>
        </form>
      </div>
    </div>
  );
}
'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FC, FormEvent, useState } from "react";

interface FormProps {
  type: string; // Type of the form action (e.g., "Create", "Edit")
  test: { name: string; projectName: string; csvData: string; url: string }; // Structure of the post object
  setTest: (test: { name: string; projectName: string; csvData: string; url: string }) => void; // Function to update the post state
  submitting: boolean; // Submission state
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Submit handler
}

const Form: FC<FormProps> = ({ type, test, setTest, submitting, handleSubmit }) => {
  const [csvError, setCsvError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCsvError("CSV file is required.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setTest({ ...test, csvData: text });
        setCsvError(null); // Clear error if file is successfully read
      } else {
        setCsvError("Failed to read CSV file.");
      }
    };
    reader.onerror = () => {
      setCsvError("Error reading CSV file.");
    };
    reader.readAsText(file);
  };

  return (
    <section className="w-full max-w-full flex items-center flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Test</span>
      </h1>
      <p className="desc text-left max-w-md">{type} and Analyse your penetration test</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* Name Input */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Name</span>
          <Input
            value={test.name}
            type="text"
            placeholder="Enter the test name (required)"
            onChange={(e) => setTest({ ...test, name: e.target.value })}
            required
          />
        </label>

        {/* Project Name Input */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Project Name</span>
          <Input
            value={test.projectName}
            type="text"
            placeholder="Enter the project name (required)"
            onChange={(e) => setTest({ ...test, projectName: e.target.value })}
            required
          />
        </label>

        {/* GitHub Repository Input */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Git Hub Repository
          </span>
          <Input
            value={test.url || ""}
            type="url"
            placeholder="GitHubRepo (Optional)"
            onChange={(e) => setTest({ ...test, url: e.target.value })}
          />
        </label>

        {/* CSV File Input */}
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Upload CSV File (required)
          </span>
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mt-2"
            required
          />
          {csvError && <p className="text-red-600 text-sm mt-2">{csvError}</p>}
        </label>

        <div className="flex items-center justify-around flex-end mx-3 mb-5 gap-4">
          <Button variant="outline">
            <Link href="/">Cancel</Link>
          </Button>

          <Button type="submit" disabled={submitting}>
            {submitting ? `${type}ing...` : type}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Form;

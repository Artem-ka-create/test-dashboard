'use client';

import React, { useState } from 'react';
import Form from '../components/Form';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const CreateTest = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [test, setTest] = useState({ name: "", projectName: "", url: "", csvData: "" });

    const createTest = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/test/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: test.name,
                    projectName: test.projectName,
                    url: test.url || null,
                    csvData: test.csvData,
                    userId: session?.user.id,
                    done: false,
                }),
            });

            if (response.ok) {
                router.push("/");
            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
            }
        } catch (error) {
            console.error("Error creating test:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type="Create"
            test={test}
            setTest={setTest}
            submitting={submitting}
            handleSubmit={createTest}
        />
    );
};

export default CreateTest;

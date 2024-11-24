'use client';

import React, { useState } from 'react'
import Form from '../components/Form';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

const CreateTest = () => {
    const router = useRouter();

    const { data: session } = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [test, setTest] = useState({ url: "", csvData: ""  });

    const createTest = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/test/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: test.url || null,
                    userId: session?.user.id ,
                    csvData: test.csvData,
                    done: false
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Form
            type='Create'
            test={test}
            setTest={setTest}
            submitting={submitting}
            handleSubmit={createTest}
        />
    )
}

export default CreateTest
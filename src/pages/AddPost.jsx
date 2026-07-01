import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
    return (
        <section className="py-12">
            <Container>

                <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">

                    <h1 className="mb-8 text-4xl font-bold">
                        Create New Post
                    </h1>

                    <PostForm />

                </div>

            </Container>
        </section>
    );
}

export default AddPost;
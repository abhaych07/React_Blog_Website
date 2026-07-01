import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        }
    }, [slug, navigate]);

    if (!post) return null;

    return (
        <section className="py-12">
            <Container>

                <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">

                    <h1 className="mb-8 text-4xl font-bold">
                        Edit Post
                    </h1>

                    <PostForm post={post} />

                </div>

            </Container>
        </section>
    );
}

export default EditPost;
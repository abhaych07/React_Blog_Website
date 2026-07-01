import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);

    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (!post) return null;

    return (
        <section className="py-12">
            <Container>

                <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

                    <img
                        src={appwriteService.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="h-[500px] w-full object-cover"
                    />

                    <div className="p-10">

                        <div className="flex flex-wrap items-center justify-between gap-4">

                            <h1 className="text-5xl font-bold text-gray-900">
                                {post.title}
                            </h1>

                            {isAuthor && (
                                <div className="flex gap-3">

                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor="bg-green-600">
                                            ✏ Edit
                                        </Button>
                                    </Link>

                                    <Button
                                        bgColor="bg-red-600"
                                        onClick={deletePost}
                                    >
                                        🗑 Delete
                                    </Button>

                                </div>
                            )}

                        </div>

                        <div className="mt-10 border-t pt-8 leading-8 text-gray-700 browser-css">
                            {parse(post.content)}
                        </div>

                    </div>

                </div>

            </Container>
        </section>
    );
}
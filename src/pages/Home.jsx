import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard, Button } from "../components";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white py-24">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            Share Your Ideas With The World
                        </h1>

                        <p className="mt-6 text-lg text-indigo-100">
                            Write blogs, publish tutorials, and inspire thousands
                            of readers.
                        </p>

                        <div className="mt-8">
                            <Link to="/add-post">
                                <Button className="bg-white text-blue-700 hover:bg-gray-100">
                                    Start Writing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Posts */}
            <section className="py-16">
                <Container>

                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Latest Posts
                        </h2>

                        <Link
                            to="/all-posts"
                            className="text-indigo-600 hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    {posts.length === 0 ? (
                        <div className="rounded-2xl bg-white p-12 text-center shadow">
                            <h2 className="text-3xl font-bold text-gray-700">
                                No posts available
                            </h2>

                            <p className="mt-3 text-gray-500">
                                Be the first one to publish something.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.slice(0, 6).map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
}

export default Home;
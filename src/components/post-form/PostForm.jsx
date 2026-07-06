import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                data.featuredImage = file.$id;

                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="grid gap-8 lg:grid-cols-3"
        >
            {/* Left Section */}
            <div className="lg:col-span-2 space-y-6 rounded-2xl bg-gray-50 p-6 shadow">

                <h2 className="text-2xl font-bold text-gray-800">
                    Post Details
                </h2>

                <Input
                    label="Title"
                    placeholder="Enter post title..."
                    className="w-full"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Post slug..."
                    className="w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        )
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right Section */}
            <div className="space-y-6 rounded-2xl bg-gray-50 p-6 shadow">

                <h2 className="text-2xl font-bold text-gray-800">
                    Publish
                </h2>

                <Input
                    label="Featured Image"
                    type="file"
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                    {...register("image", {
                        required: !post,
                    })}
                />

                {post && (
                    <div>

                        <p className="mb-3 text-sm font-medium text-gray-600">
                            Current Image
                        </p>

                        <img
                            src={appwriteService.getFileView(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="rounded-xl border shadow"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", {
                        required: true,
                    })}
                />

                <Button
                    type="submit"
                    className={`w-full py-3 text-lg ${
                        post
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                >
                    {post ? "Update Post" : "Publish Your New Post"}
                </Button>

            </div>
        </form>
    );
}
export default function CreateBlog() {
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl m-auto 
        mt-[200px] h-[300px] w-[400px] items-center justify-center gap-4">
            <h1 className="text-center text-3xl font-bold">Create Your Blog</h1>
            <div className="card-body gap-5 w-[330px]">
                <input type="text" placeholder="Blog Title" className="input input-bordered w-full max-w-xs" />
                <textarea className="textarea textarea-bordered h-[100px]" placeholder="About Blog"></textarea>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Post Blog</button>
                </div>
            </div>
        </div>
    )
}
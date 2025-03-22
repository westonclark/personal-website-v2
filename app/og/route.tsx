import { ImageResponse } from "next/og";

export function GET(request: Request) {
    let url = new URL(request.url);
    let title = url.searchParams.get("title") || "Weston Clark";

    return new ImageResponse(
        (
            <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
                <div tw="flex flex-col w-full h-full items-center justify-center px-4">
                    <div tw="flex flex-col max-w-4xl">
                        <h1 tw="text-6xl font-bold text-white tracking-tight">{title}</h1>
                        <p tw="text-2xl text-neutral-400 mt-4">Software Engineer</p>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}

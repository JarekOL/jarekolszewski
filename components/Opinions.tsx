import { FaStar } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { OPINIONS } from "@/constants/Links";

function getRandomColor(name: string) {
    const colors = [
        "bg-red-500",
        "bg-brown-500",
        "bg-blue-500",
        "bg-green-600",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-900",
        "bg-orange-500",
        "bg-emerald-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
}

export default function Opinions() {
    return (
        <Carousel className="w-full px-2 py-8 ">
            <CarouselContent className="flex gap-2">
                {OPINIONS.map((opinia, i) => {
                    const fullStars = Math.floor(opinia.rating);
                    const bgColor = getRandomColor(opinia.name);

                    return (
                        <CarouselItem
                            key={i}
                            className="basis-[80%] lg:basis-[40%]"
                        >
                            <div className="bg-white rounded-2xl shadow-lg py-6 px-3 h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 border border-neutral-200">
                                <p className="text-neutral-700 mb-4 text-base leading-relaxed italic">
                                    “{opinia.text}”
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar
                                                key={idx}
                                                className={`w-5 h-5 ${
                                                    idx < fullStars
                                                        ? "text-yellow-400"
                                                        : idx < opinia.rating
                                                        ? "text-yellow-400 opacity-60"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-neutral-600 font-light -tracking-wide">
                                        {opinia.rating.toFixed(1)} / 5.0
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-3 mt-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-light text-lg ${bgColor}`}
                                    >
                                        {opinia.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-neutral-800">
                                        {opinia.name}
                                    </span>
                                </div>
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
        </Carousel>
    );
}

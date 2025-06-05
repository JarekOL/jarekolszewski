import { MainBtn } from "@/components/Buttons/MainBtn";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="h-[80vh] flex items-center justify-center text-center space-x-2">
            <MainBtn>
                <Link href="/adm/strona">Strona</Link>
            </MainBtn>
            <MainBtn>
                <Link href="/adm/blog">Blog</Link>
            </MainBtn>
        </div>
    );
}

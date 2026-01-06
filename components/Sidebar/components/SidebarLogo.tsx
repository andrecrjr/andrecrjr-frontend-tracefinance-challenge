import Image from "next/image";

export const SidebarLogo = () => {
    return (
        <div className="px-6 py-8">
            <Image
                src="/tracefinance.svg"
                alt="Trace Finance"
                width={165}
                height={22}
                priority
            />
        </div>
    );
};

import path from "path";
import fs from "fs";

export function getImagesFromFolder(
    folderName: string,
    maxImages: number,
    basePath: string = "/Images"
) {
    const dirPath = path.join(process.cwd(), "public", basePath, folderName);
    const files = fs.readdirSync(dirPath);

    return files
        .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
        .slice(0, maxImages)
        .map((file) => {
            const imagePath = `${basePath}/${folderName}/${file}`;
            return {
                responsiveImage: {
                    src: imagePath,
                    width: 1000,
                    height: 667,
                },
            };
        });
}

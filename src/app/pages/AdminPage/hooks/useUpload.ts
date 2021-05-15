import { message } from "antd";
import React, { ChangeEvent } from "react";

const getBase64 = (file: Blob, callback: Function) => {
    return new Promise((resolve, rejects) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(callback(reader.result));
        reader.onerror = error => rejects(error);
    });
};

const validateUploadFile = (file: File) => {
    const { type: fileType, size: fileSize, name: fileName } = file;

    const allowExtension = ["jpg", ".png", ".svg", "jpeg"];
    const allowSize = fileSize / 1024 / 1024 < 2;

    const fileExtension = fileType?.split("/").pop() as string;

    if (!allowExtension.includes(fileExtension)) {
        message.error("File không đúng định dạng");
        return false;
    } else if (!allowSize) {
        message.error("File phải nhỏ hơn 2MB");
        return false;
    } else {
        return true;
    }
};

export const useUpload = () => {
    const [hinhAnh, setImgUpload] = React.useState<File>();
    const [imgPreview, setImgPreview] = React.useState<string | any>("");
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleFileChange = (e: any) => {
        setLoading(true);
        if (validateUploadFile(e.target.files[0])) {
            getBase64(e.target.files[0], imgUrl => {
                setImgPreview(imgUrl);
            });
            setImgUpload(e.target.files[0]);
        }

        setLoading(false);
    };

    console.log("hinhAnh", hinhAnh);

    return { hinhAnh, handleFileChange, loading, imgPreview, setImgUpload };
};

import React from "react";
import { Link } from "react-router-dom";

export interface FormTemplateProps {}

const FormTemplate: React.FC<FormTemplateProps> = ({ children }) => {
    return (
        <div className="login__wrapper--content">
            <div className="login__title">
                <h1>
                    <Link to="/">
                        {window.location.pathname === "/login" ? "Đăng nhập" : "Đăng kí"}
                    </Link>
                </h1>
            </div>

            {children}
        </div>
    );
};

export default FormTemplate;

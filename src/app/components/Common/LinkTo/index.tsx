/**
 *
 * Anchor
 *
 */
import { Anchor, AnchorProps } from "antd";
import React, { memo } from "react";
import styled from "styled-components/macro";

interface ILinkToProps extends AnchorProps {
    title: string;
    href: string;
    target?: string;
}

export const LinkTo = memo(({ title, href, ...rest }: ILinkToProps) => {
    return (
        <Wrapper bounds={1} offsetTop={50} {...rest}>
            <Anchor.Link href={href} title={title} />
        </Wrapper>
    );
});

const Wrapper = styled(Anchor)`
    background: transparent;

    .ant-anchor-link-active > .ant-anchor-link-title {
        color: #fb4226;
    }

    .ant-anchor-ink {
        display: none;
    }
    .ant-anchor-link {
        font-size: 1.3rem;
        a {
            &:hover {
                color: #fff;
            }
        }
    }
`;

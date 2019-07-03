import styled from 'styled-components';

export const Loading = styled.div`
    color: #fff;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16px;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const Filter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;

    span {
        font-size: 12px;
        color: #999;
        margin-right: 5px;
    }

    select {
        border: 1px solid #eee;
        padding: 5px;
        border-radius: 4px;
    }
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    button {
        background: #fff;
        border: 1px solid #7159c1;
        color: #7159c1;
        padding: 10px;
        border-radius: 4px;
        transition: all 0.3s;

        &:hover:not([disabled]) {
            background: #7159c1;
            border: 1px solid #7159c1;
            color: #fff;
        }

        &[disabled] {
            background: #eee;
            border: 0;
            color: #666;
            cursor: not-allowed;
        }
    }
`;
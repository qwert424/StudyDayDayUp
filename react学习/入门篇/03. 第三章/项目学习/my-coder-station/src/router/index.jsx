import React from 'react';
import { useRoutes, Navigate } from "react-router-dom";
import IssuesPage from '../pages/IssuesPage/IssuesPage';
import BooksPage from '../pages/BooksPage/BooksPage';
import InterviewsPage from '../pages/InterviewsPage/InterviewsPage';

function Index() {
    let element = useRoutes([
        { path: "/issues", element: <IssuesPage /> },
        { path: "/books", element: <BooksPage /> },
        { path: "/interviews", element: <InterviewsPage /> },
        // 重定向
        { path: "/", element: <Navigate to="/issues" replace={true} /> }
    ]);

    return element;
}

export default Index;
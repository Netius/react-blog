import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import articles from "./article-content";
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser.js';

const ArticlePage = () => {

	const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });
	const params = useParams();
	const articleId = params.articleId; //Getting ID from each article

	const { user, isLoading } = useUser();

	useEffect(() => {
		const loadArticle = async () => {
			const token = user && await user.getIdToken();
			const headers = token ? {authtoken: token } : {};
			const res = await axios.get(`/api/articles/${articleId}`, { headers});
			const newArticleInfo = res.data;
			setArticleInfo(newArticleInfo)
		}
		loadArticle();
	}, [articleId]);


	const addUpVote = async () => {
		const token = user && await user.getIdToken();
		const headers = token ? {authtoken: token } : {};
		const res = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers});
		const updatedArticle = res.data;
		setArticleInfo(updatedArticle);
	}

	const article = articles.find(article => article.name === articleId);

	if (!article) return <NotFoundPage />;
	return (
		<>
			<h1>{article.title}</h1>
			<div className='upvotes-section'>
				{user
					? <button onClick={addUpVote}>Upvote</button>
					: <button>Log in to upvote</button>
				}
				<p>This article has {articleInfo.upvote} upvote(s)</p>
			</div>
			{article.content.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
			{user
				? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
				: <button>Log in to comment</button>
			}
			<CommentsList comments={articleInfo.comments} />
		</>
	)
}

export default ArticlePage;
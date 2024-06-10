import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import articles from "./article-content";
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import CommentsList from '../components/CommentsList';

const ArticlePage = () => {

	const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] });
	const params = useParams();
	const articleId = params.articleId; //Getting ID from each article

	useEffect(() => {
		const loadArticle = async () => {
			const res = await axios.get(`/api/articles/${articleId}`);
			const newArticleInfo = res.data;
			setArticleInfo(newArticleInfo)
		}
		loadArticle();
	}, [articleId]);


	const addUpVote = async () => {
		const res = await axios.put(`/api/articles/${articleId}/upvote`);
		const updatedArticle = res.data;
		setArticleInfo(updatedArticle);
	}

	const article = articles.find(article => article.name === articleId);

	if (!article) return <NotFoundPage />;

	return (
		<>
			<h1>{article.title}</h1>
			<div className='upvotes-section'>
				<button onClick={addUpVote}>Upvote</button>
				<p>This article has {articleInfo.upvote} upvote(s)</p>
			</div>
			{article.content.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}

			<CommentsList comments={articleInfo.comments} />
		</>
	)
}

export default ArticlePage;
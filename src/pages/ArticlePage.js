import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import articles from './article-content.tsx';
import NotFoundPage from './NotFoundPage';
import axios from 'axios';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser.js';


const ArticlePage = () => {
	const [articleInfo, setArticleInfo] = useState({ upvote: 0, comments: [] , canUpvote: false});
	const { canUpvote } = articleInfo;
	const params = useParams();
	const articleId = params.articleId; //Getting ID from each article

	const { user, isLoading } = useUser();

  const navigate = useNavigate();

	useEffect(() => {
		const loadArticle = async () => {
			const token = user && await user.getIdToken();
			const headers = token ? {authtoken: token } : {};
			const res = await axios.get(`/api/articles/${articleId}`, { headers});
			const newArticleInfo = res.data;
			setArticleInfo(newArticleInfo);
		}
		if(!isLoading){
			loadArticle();
		}
	}, [isLoading, user, articleId]);


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
			<h1 className='mb-0'>{article.title}</h1>
			<div className='upvotes-section'>
				{user
					?<>
						<p>This article has <b>{articleInfo.upvote} upvote(s)</b></p>
					 	<button className='btn btn-success mb-4' onClick={addUpVote}>{canUpvote ? 'Upvote' : 'Already upvoted'}</button>
					 </>
					: 
					<div>
						<p>This article has <b>{articleInfo.upvote} upvote(s)</b></p>
						<button onClick={() => navigate("/login")} className='btn btn-info mb-4'>Log in to upvote</button>
					</div>
				}
				
			</div>
			{article.content.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
			{user
				? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
				: <button  onClick={() => navigate("/login")} className='btn btn-info mb-3'>Log in to comment</button>
			}
			<CommentsList comments={articleInfo.comments} />
		</>
	)
}

export default ArticlePage;
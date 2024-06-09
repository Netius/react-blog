import React from 'react'
import { useParams } from 'react-router-dom';
import articles from "./article-content";

const ArticlePage = () => {
	const params = useParams();
	const articleId = params.articleId; //Getting ID from each article

	const article = articles.find(article => article.name == articleId);
	console.log(article)

	return (
		<>
			<h1>{article.title}</h1>
			{article.content.map((paragraph,index) => (
				<p key={index}>{paragraph}</p>
			))}
		</>
	)
}

export default ArticlePage;
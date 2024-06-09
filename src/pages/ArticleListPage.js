import React from 'react';
import articles from './article-content';
import { Link } from 'react-router-dom';

const ArticleListPage = () => {
	return (
		<>
			<h1>Articles</h1>
			{articles.map((article, index) => (
				<Link className='article-list-item' to={`/articles/${article.name}`} key={index}>
					<h2>{article.title}</h2>
					<p>{article.content[0].substring(0, 150)}...</p>
				</Link>
			))}		
		</>
	)
}

export default ArticleListPage
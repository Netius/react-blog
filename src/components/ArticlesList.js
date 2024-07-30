import React from 'react';
import { Link } from 'react-router-dom';

const ArticlesList = ({articles}) => {
	return (
		<>
			{articles.map((article, index) => (
				<Link className='link-styles' to={`/articles/${article.name}`} key={index}>
					<div className="card my-3 py-4 card-article-body" style={{width: '100%'}}>
						<div className="card-body">
							<h2 className="card-title h3">{article.title}</h2>
							<p className="card-text">{article.content[0].substring(0, 150)}...</p>
							<Link className='btn btn-outline-primary link-styles' to={`/articles/${article.name}`} key={index}>
								Read more
							</Link>
						</div>
					</div>
				</Link>
			))}
		</>
	)
}

export default ArticlesList
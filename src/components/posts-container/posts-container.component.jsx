import React, { useEffect} from 'react';
import './posts-container.styles.scss';

import { connect } from 'react-redux';
import Loader from '../loader/loader.component';


const PostCard = React.lazy(() => import('../post-card/post-card.component')) ;


const PostsContainer = ({ postList, likes_by_user }) => {

    useEffect(() => {
    
    }, [likes_by_user])

    return (
        postList
            ? (
                <React.Fragment>

                    <div className='posts-container'>

                        {
                            postList.map(post => {

                                const isPostLikedByUser = (likes_by_user && likes_by_user.length && likes_by_user.find(like => {
                                     
                                    return (like.ref['@ref'].id === post.ref['@ref'].id);
                                }))? true : false;

                                 return(
                                     <React.Suspense key={post.ref['@ref'].id} fallback={<div>Loading....</div>}>
                                         <PostCard
                                            
                                            id={post.ref['@ref'].id}
                                            data={post.data}
                                            isPostLikedByUser={isPostLikedByUser}
                                        />
                                     </React.Suspense>
                                 )
                            })
                        }

                    </div>
                </React.Fragment>

            ) : (
                <Loader/>
            )
    )
}

const mapStateToProps = state => ({
    //all_posts: state.all_posts.all_posts,
    likes_by_user: state.likes_by_user.likes_by_user
})

export default connect(
    mapStateToProps,
    null
)(PostsContainer);

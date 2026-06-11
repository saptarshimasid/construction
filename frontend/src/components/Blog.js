'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import styles from './Blog.module.css';

export default function Blog({ onContactClick }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/blogs');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          throw new Error('Failed to load blogs');
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // Fallback data
        setBlogs([
          {
            id: 1,
            title: 'Work in the Vulnerable Building Commercial of blog',
            description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
            author: 'Admin',
            date: 'Agu 02, 2023',
            comments: 2,
            rating: 5,
            category: 'ENGINEER',
            image: '/images/blog_1.png'
          },
          {
            id: 2,
            title: 'Work in the Vulnerable Building Commercial of blog',
            description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
            author: 'Admin',
            date: 'Agu 02, 2023',
            comments: 2,
            rating: 5,
            category: 'BUILDING',
            image: '/images/blog_2.png'
          },
          {
            id: 3,
            title: 'Work in the Vulnerable Building Commercial of blog',
            description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
            author: 'Admin',
            date: 'Agu 02, 2023',
            comments: 2,
            rating: 5,
            category: 'ENGINEER',
            image: '/images/blog_3.png'
          },
          {
            id: 4,
            title: 'Work in the Vulnerable Building Commercial of blog',
            description: 'We poor standard chunk of nihil velit auctor aliquet sollicitudin.',
            author: 'Admin',
            date: 'Agu 02, 2023',
            comments: 2,
            rating: 5,
            category: 'BUILDING',
            image: '/images/blog_4.png'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className={`section-padding ${styles.blogSection}`} id="blog">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>
            <Sparkles size={14} />
            OUR LARGEST BLOG
          </span>
          <h2 className={styles.heading}>We Going Largest Our Blog</h2>
          <div className={styles.line} />
        </div>

        {/* Alternating Grid */}
        <div className={styles.grid}>
          {/* Card 1: Text Card */}
          {blogs[0] && (
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>By: {blogs[0].author}, {blogs[0].date}</span>
                <span className={styles.metaItem}><MessageSquare size={12} /> Comments ({blogs[0].comments})</span>
              </div>
              <h3 className={styles.title}>{blogs[0].title}</h3>
              <p className={styles.desc}>{blogs[0].description}</p>
              
              <div className={styles.stars}>
                {[...Array(blogs[0].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-primary)" stroke="var(--color-primary)" />
                ))}
              </div>

              <button onClick={onContactClick} className={styles.readMore}>
                <span>Read More</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Card 2: Image Card */}
          {blogs[1] && (
            <div className={`${styles.card} ${styles.imageCard}`}>
              <div 
                className={styles.imageBg} 
                style={{ backgroundImage: `url(${blogs[1].image})` }}
              />
              <span className={styles.categoryTag}>{blogs[1].category}</span>
            </div>
          )}

          {/* Card 3: Text Card */}
          {blogs[2] && (
            <div className={`${styles.card} ${styles.textCard}`}>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>By: {blogs[2].author}, {blogs[2].date}</span>
                <span className={styles.metaItem}><MessageSquare size={12} /> Comments ({blogs[2].comments})</span>
              </div>
              <h3 className={styles.title}>{blogs[2].title}</h3>
              <p className={styles.desc}>{blogs[2].description}</p>
              
              <div className={styles.stars}>
                {[...Array(blogs[2].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-primary)" stroke="var(--color-primary)" />
                ))}
              </div>

              <button onClick={onContactClick} className={styles.readMore}>
                <span>Read More</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Card 4: Image Card */}
          {blogs[3] && (
            <div className={`${styles.card} ${styles.imageCard} ${styles.secondImageCard}`}>
              <div 
                className={styles.imageBg} 
                style={{ backgroundImage: `url(${blogs[3].image})` }}
              />
              <span className={styles.categoryTag}>{blogs[3].category}</span>
            </div>
          )}

          {/* Card 5: Text Card */}
          {blogs[1] && (
            <div className={`${styles.card} ${styles.textCard} ${styles.secondTextCard}`}>
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>By: {blogs[1].author}, {blogs[1].date}</span>
                <span className={styles.metaItem}><MessageSquare size={12} /> Comments ({blogs[1].comments})</span>
              </div>
              <h3 className={styles.title}>{blogs[1].title}</h3>
              <p className={styles.desc}>{blogs[1].description}</p>
              
              <div className={styles.stars}>
                {[...Array(blogs[1].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--color-primary)" stroke="var(--color-primary)" />
                ))}
              </div>

              <button onClick={onContactClick} className={`${styles.readMore} ${styles.activeReadMore}`}>
                <span>Read More</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Card 6: Image Card */}
          {blogs[2] && (
            <div className={`${styles.card} ${styles.imageCard}`}>
              <div 
                className={styles.imageBg} 
                style={{ backgroundImage: `url(${blogs[2].image})` }}
              />
              <span className={styles.categoryTag}>{blogs[2].category}</span>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className={styles.btnWrapper}>
          <button onClick={onContactClick} className="btn-primary">
            <span>View All Blog</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

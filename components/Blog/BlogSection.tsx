'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogSection: React.FC = () => {
  return (
    <section className="blog spad">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-4 col-md-5">
            <div className="blog__sidebar">
              {/* Search */}
              <div className="blog__sidebar__search">
                <form action="#">
                  <input type="text" placeholder="Search..." />
                  <button type="submit"><span className="icon_search"></span></button>
                </form>
              </div>

              {/* Categories */}
              <div className="blog__sidebar__item">
                <h4>Categories</h4>
                <ul>
                  <li><Link href="#">All</Link></li>
                  <li><Link href="#">Beauty (20)</Link></li>
                  <li><Link href="#">Food (5)</Link></li>
                  <li><Link href="#">Life Style (9)</Link></li>
                  <li><Link href="#">Travel (10)</Link></li>
                </ul>
              </div>

              {/* Recent News */}
              <div className="blog__sidebar__item">
                <h4>Recent News</h4>
                <div className="blog__sidebar__recent">
                  {[
                    { src: '/img/blog/sidebar/sr-1.jpg', title: '09 Kinds Of Vegetables Protect The Liver', date: 'MAR 05, 2019' },
                    { src: '/img/blog/sidebar/sr-2.jpg', title: 'Tips You To Balance Nutrition Meal Day', date: 'MAR 05, 2019' },
                    { src: '/img/blog/sidebar/sr-3.jpg', title: '4 Principles Help You Lose Weight With Vegetables', date: 'MAR 05, 2019' },
                  ].map((item, index) => (
                    <Link href="#" className="blog__sidebar__recent__item" key={index}>
                      <div className="blog__sidebar__recent__item__pic">
                        <Image src={item.src} alt="" width={70} height={70} />
                      </div>
                      <div className="blog__sidebar__recent__item__text">
                        <h6>{item.title.split(' ').slice(0, 5).join(' ')}<br />{item.title.split(' ').slice(5).join(' ')}</h6>
                        <span>{item.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="blog__sidebar__item">
                <h4>Search By</h4>
                <div className="blog__sidebar__item__tags">
                  {['Apple', 'Beauty', 'Vegetables', 'Fruit', 'Healthy Food', 'Lifestyle'].map((tag, i) => (
                    <Link href="#" key={i}>{tag}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div className="col-lg-8 col-md-7">
            <div className="row">
              {[
                { img: '/img/blog/blog-2.jpg', title: '6 ways to prepare breakfast for 30', date: 'May 4,2019' },
                { img: '/img/blog/blog-3.jpg', title: 'Visit the clean farm in the US', date: 'May 4,2019' },
                { img: '/img/blog/blog-1.jpg', title: 'Cooking tips make cooking simple', date: 'May 4,2019' },
                { img: '/img/blog/blog-4.jpg', title: 'Cooking tips make cooking simple', date: 'May 4,2019' },
                { img: '/img/blog/blog-4.jpg', title: 'The Moment You Need To Remove Garlic From The Menu', date: 'May 4,2019' },
                { img: '/img/blog/blog-6.jpg', title: 'Cooking tips make cooking simple', date: 'May 4,2019' },
              ].map((post, idx) => (
                <div className="col-lg-6 col-md-6 col-sm-6" key={idx}>
                  <div className="blog__item">
                    <div className="blog__item__pic">
                      <Image src={post.img} alt={post.title} width={360} height={240} />
                    </div>
                    <div className="blog__item__text">
                      <ul>
                        <li><i className="fa fa-calendar-o"></i> {post.date}</li>
                        <li><i className="fa fa-comment-o"></i> 5</li>
                      </ul>
                      <h5><Link href="#">{post.title}</Link></h5>
                      <p>Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat</p>
                      <Link href="#" className="blog__btn">READ MORE <span className="arrow_right"></span></Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="col-lg-12">
                <div className="product__pagination blog__pagination">
                  <Link href="#">1</Link>
                  <Link href="#">2</Link>
                  <Link href="#">3</Link>
                  <Link href="#"><i className="fa fa-long-arrow-right"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

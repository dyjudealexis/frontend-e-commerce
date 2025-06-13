'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BlogItem {
  imgSrc: string;
  date: string;
  comments: number;
  title: string;
  description: string;
  link: string;
}

const blogData: BlogItem[] = [
  {
    imgSrc: '/img/blog/blog-1.jpg',
    date: 'May 4, 2019',
    comments: 5,
    title: 'Cooking tips make cooking simple',
    description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
    link: '/blog/details',
  },
  {
    imgSrc: '/img/blog/blog-2.jpg',
    date: 'May 4, 2019',
    comments: 5,
    title: '6 ways to prepare breakfast for 30',
    description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
    link: '/blog/details',
  },
  {
    imgSrc: '/img/blog/blog-3.jpg',
    date: 'May 4, 2019',
    comments: 5,
    title: 'Visit the clean farm in the US',
    description: 'Sed quia non numquam modi tempora indunt ut labore et dolore magnam aliquam quaerat',
    link: '/blog/details',
  },
];

const BlogSection: React.FC = () => {
  return (
    <section className="from-blog spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title from-blog__title">
              <h2>From The Blog</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {blogData.map((item, index) => (
            <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
              <div className="blog__item">
                <div className="blog__item__pic">
                  <Image src={item.imgSrc} alt={item.title} width={350} height={220} layout="responsive" className='blog-image' />
                </div>
                <div className="blog__item__text">
                  <ul>
                    <li><i className="fa fa-calendar-o"></i> {item.date}</li>
                    <li><i className="fa fa-comment-o"></i> {item.comments}</li>
                  </ul>
                  <h5>
                    <Link href={item.link}>{item.title}</Link>
                  </h5>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

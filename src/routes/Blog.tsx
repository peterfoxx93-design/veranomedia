import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../blog/articles'

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${article.slug}`}
        className="group block bg-white rounded-vm-lg p-8 border border-[#E8E8ED]/50 hover:border-[#D1D1D6] transition-all duration-500 hover:shadow-vm-lg hover:-translate-y-0.5"
      >
        <div className="text-xs font-semibold text-[#0066CC] uppercase tracking-[0.15em] mb-2">
          {article.category}
        </div>
        <h2 className="font-serif text-heading-sm text-[#1C1C1E] group-hover:text-[#0066CC] transition-colors duration-300 mb-3">
          {article.title}
        </h2>
        <p className="text-base text-[#636366] leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-[#8E8E93]">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#D1D1D6]" />
          <span>{article.readTime} min de lectura</span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="pt-20">
      <section className="section-vm">
        <div className="container-vm text-center max-w-3xl mx-auto" ref={ref}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-[#0066CC] uppercase tracking-widest"
          >
            Un cuaderno de Verano
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-heading-xl md:text-[4.5rem] text-[#1C1C1E] mt-3 mb-4 leading-[1.05]"
          >
            Aprende, aplica, crece
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#636366] leading-relaxed max-w-xl mx-auto"
          >
            Artículos semanales sobre marketing digital, diseño web y estrategia de contenido —
            explicados como a ti te gustaría que te los explicaran.
          </motion.p>
        </div>
      </section>

      <section className="section-vm-alt">
        <div className="container-vm">
          <div className="max-w-3xl mx-auto space-y-6">
            {articles.filter(a => a.published).map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

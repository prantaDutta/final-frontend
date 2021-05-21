interface IndexPageSectionProps {
  title: string
}

const IndexPageSection: React.FC<IndexPageSectionProps> = ({ children, title }) => {
  return (
    <section className="py-6 mx-1 md:mx-2">
      <div className="text-gray-600">
        <div className="flex justify-center items-center">
          <h2 className="text-2xl md:text-4xl font-semibold md:font-bold text-center">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}

export default IndexPageSection

interface footerProps {}

const Footer: React.FC<footerProps> = ({}) => {
  return (
    <footer>
      <div className="flex justify-center tracking-wider font-bold md:font-semibold text-ls md:text-ls items-center px-4 py-3 text-gray-600">
        &copy; GrayScale 2020
      </div>
    </footer>
  )
}

export default Footer

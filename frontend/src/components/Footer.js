function Footer() {
  return (
    <footer
      className="footer"
      aria-label="Подвал сайта, информация о правообладателе"
    >
      <p className="footer__copyright" lang="en">
        © {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;

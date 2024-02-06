const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="flex justify-center h-10 bg-slate-50">
      <h3>Copyright MrFritz's Dad Jokes {year} </h3>
    </footer>
  );
};
export default Footer;

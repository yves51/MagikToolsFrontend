const Footer = () => {
  return (
    <div className="row g-0 justify-content-between align-items-center h-100">
      <div className="col-12 col-sm-auto text-center">
        <p className="mb-0 mt-2 mt-sm-0 text-body">
       &copy; 2004-{new Date().getFullYear()} Mediatec Group. Tous droits réservés. Fièrement conçu par
          <span className="d-none d-sm-inline-block"></span>
          <span className="d-none d-sm-inline-block mx-1"></span>
          <br className="d-sm-none" />
            Mediatec Group
        </p>
      </div>
      <div className="col-12 col-sm-auto text-center">
        <p className="mb-0 text-body-tertiary text-opacity-85">v1.18.1</p>
      </div>
    </div>
  );
};

export default Footer;

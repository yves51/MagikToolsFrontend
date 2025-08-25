
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <>
     
    <main className="main" id="top">
    
              
      <nav className="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
      </nav>

      <nav className="navbar navbar-top fixed-top navbar-expand" id="navbarDefault">
          <Navbar />
      </nav>
      
      <div className="content">
        <Outlet />
        <footer className="footer position-absolute">
          <Footer />
        </footer>
      </div>

      <div className="modal fade" id="searchBoxModal" tabIndex={-1} aria-hidden="true" data-bs-backdrop="true" data-phoenix-modal="data-phoenix-modal" style={{ '--phoenix-backdrop-opacity': '1' } as React.CSSProperties}>
        <div className="modal-dialog">
          <div className="modal-content mt-15 rounded-pill">
            <div className="modal-body p-0">
              <div className="search-box navbar-top-search-box" data-list='{"valueNames":["title"]}' style={{ width: 'auto' }}>
                <form className="position-relative" data-bs-toggle="search" data-bs-display="static">
                  <input className="form-control search-input fuzzy-search rounded-pill form-control-lg" type="search" placeholder="Search..." aria-label="Search" />
                  <span className="fas fa-search search-box-icon"></span>

                </form>
                <div className="btn-close position-absolute end-0 top-50 translate-middle cursor-pointer shadow-none" data-bs-dismiss="search">
                  <button className="btn btn-link p-0" aria-label="Close"></button>
                </div>
                <div className="dropdown-menu border start-0 py-0 overflow-hidden w-100">
                  <div className="scrollbar-overlay" style={{maxHeight: '30rem'}}>
                    <div className="list pb-3">
                      <h6 className="dropdown-header text-body-highlight fs-10 py-2">24 <span className="text-body-quaternary">results</span></h6>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Recently Searched </h6>
                      <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"><span className="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2"></span> Store Macbook</div>
                          </div>
                        </a>
                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"> <span className="fa-solid fa-clock-rotate-left" data-fa-transform="shrink-2"></span> MacBook Air - 13″</div>
                          </div>
                        </a>

                      </div>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Products</h6>
                      <div className="py-2"><a className="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                          <div className="file-thumbnail me-2"><img className="h-100 w-100 object-fit-cover rounded-3" src="assets/img/products/60x60/3.png" alt="" /></div>
                          <div className="flex-1">
                            <h6 className="mb-0 text-body-highlight title">MacBook Air - 13″</h6>
                            <p className="fs-10 mb-0 d-flex text-body-tertiary"><span className="fw-medium text-body-tertiary text-opactity-85">8GB Memory - 1.6GHz - 128GB Storage</span></p>
                          </div>
                        </a>
                        <a className="dropdown-item py-2 d-flex align-items-center" href="apps/e-commerce/landing/product-details.html">
                          <div className="file-thumbnail me-2"><img className="img-fluid" src="assets/img/products/60x60/3.png" alt="" /></div>
                          <div className="flex-1">
                            <h6 className="mb-0 text-body-highlight title">MacBook Pro - 13″</h6>
                            <p className="fs-10 mb-0 d-flex text-body-tertiary"><span className="fw-medium text-body-tertiary text-opactity-85">30 Sep at 12:30 PM</span></p>
                          </div>
                        </a>

                      </div>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Quick Links</h6>
                      <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"><span className="fa-solid fa-link text-body" data-fa-transform="shrink-2"></span> Support MacBook House</div>
                          </div>
                        </a>
                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"> <span className="fa-solid fa-link text-body" data-fa-transform="shrink-2"></span> Store MacBook″</div>
                          </div>
                        </a>

                      </div>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Files</h6>
                      <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"><span className="fa-solid fa-file-zipper text-body" data-fa-transform="shrink-2"></span> Library MacBook folder.rar</div>
                          </div>
                        </a>
                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"> <span className="fa-solid fa-file-lines text-body" data-fa-transform="shrink-2"></span> Feature MacBook extensions.txt</div>
                          </div>
                        </a>
                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"> <span className="fa-solid fa-image text-body" data-fa-transform="shrink-2"></span> MacBook Pro_13.jpg</div>
                          </div>
                        </a>

                      </div>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Members</h6>
                      <div className="py-2"><a className="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                          <div className="avatar avatar-l status-online  me-2 text-body">
                            <img className="rounded-circle " src="assets/img/team/40x40/10.webp" alt="" />

                          </div>
                          <div className="flex-1">
                            <h6 className="mb-0 text-body-highlight title">Carry Anna</h6>
                            <p className="fs-10 mb-0 d-flex text-body-tertiary">anna@technext.it</p>
                          </div>
                        </a>
                        <a className="dropdown-item py-2 d-flex align-items-center" href="pages/members.html">
                          <div className="avatar avatar-l  me-2 text-body">
                            <img className="rounded-circle " src="assets/img/team/40x40/12.webp" alt="" />

                          </div>
                          <div className="flex-1">
                            <h6 className="mb-0 text-body-highlight title">John Smith</h6>
                            <p className="fs-10 mb-0 d-flex text-body-tertiary">smith@technext.it</p>
                          </div>
                        </a>

                      </div>
                      <hr className="my-0" />
                      <h6 className="dropdown-header text-body-highlight fs-9 border-bottom border-translucent py-2 lh-sm">Related Searches</h6>
                      <div className="py-2"><a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"><span className="fa-brands fa-firefox-browser text-body" data-fa-transform="shrink-2"></span> Search in the Web MacBook</div>
                          </div>
                        </a>
                        <a className="dropdown-item" href="apps/e-commerce/landing/product-details.html">
                          <div className="d-flex align-items-center">

                            <div className="fw-normal text-body-highlight title"> <span className="fa-brands fa-chrome text-body" data-fa-transform="shrink-2"></span> Store MacBook″</div>
                          </div>
                        </a>

                      </div>
                    </div>
                    <div className="text-center">
                      <p className="fallback fw-bold fs-7 d-none">No Result Found.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="support-chat-container">
        <div className="container-fluid support-chat">
          <div className="card bg-body-emphasis">
            <div className="card-header d-flex flex-between-center px-4 py-3 border-bottom border-translucent">
              <h5 className="mb-0 d-flex align-items-center gap-2">Demo widget<span className="fa-solid fa-circle text-success fs-11"></span></h5>
              <div className="btn-reveal-trigger">
                <button className="btn btn-link p-0 dropdown-toggle dropdown-caret-none transition-none d-flex" type="button" id="support-chat-dropdown" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span className="fas fa-ellipsis-h text-body"></span></button>
                <div className="dropdown-menu dropdown-menu-end py-2" aria-labelledby="support-chat-dropdown"><a className="dropdown-item" href="#!">Request a callback</a><a className="dropdown-item" href="#!">Search in chat</a><a className="dropdown-item" href="#!">Show history</a><a className="dropdown-item" href="#!">Report to Admin</a><a className="dropdown-item btn-support-chat" href="#!">Close Support</a></div>
              </div>
            </div>
            <div className="card-body chat p-0">
              <div className="d-flex flex-column-reverse scrollbar h-100 p-3">
                <div className="text-end mt-6"><a className="mb-2 d-inline-flex align-items-center text-decoration-none text-body-emphasis bg-body-hover rounded-pill border border-primary py-2 ps-4 pe-3" href="#!">
                    <p className="mb-0 fw-semibold fs-9">I need help with something</p><span className="fa-solid fa-paper-plane text-primary fs-9 ms-3"></span>
                  </a><a className="mb-2 d-inline-flex align-items-center text-decoration-none text-body-emphasis bg-body-hover rounded-pill border border-primary py-2 ps-4 pe-3" href="#!">
                    <p className="mb-0 fw-semibold fs-9">I can’t reorder a product I previously ordered</p><span className="fa-solid fa-paper-plane text-primary fs-9 ms-3"></span>
                  </a><a className="mb-2 d-inline-flex align-items-center text-decoration-none text-body-emphasis bg-body-hover rounded-pill border border-primary py-2 ps-4 pe-3" href="#!">
                    <p className="mb-0 fw-semibold fs-9">How do I place an order?</p><span className="fa-solid fa-paper-plane text-primary fs-9 ms-3"></span>
                  </a><a className="false d-inline-flex align-items-center text-decoration-none text-body-emphasis bg-body-hover rounded-pill border border-primary py-2 ps-4 pe-3" href="#!">
                    <p className="mb-0 fw-semibold fs-9">My payment method not working</p><span className="fa-solid fa-paper-plane text-primary fs-9 ms-3"></span>
                  </a>
                </div>
                <div className="text-center mt-auto">
                  <div className="avatar avatar-3xl status-online"><img className="rounded-circle border border-3 border-light-subtle" src="assets/img/team/30.webp" alt="" /></div>
                  <h5 className="mt-2 mb-3">Eric</h5>
                  <p className="text-center text-body-emphasis mb-0">Ask us anything – we’ll get back to you here or by email within 24 hours.</p>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex align-items-center gap-2 border-top border-translucent ps-3 pe-4 py-3">
              <div className="d-flex align-items-center flex-1 gap-3 border border-translucent rounded-pill px-4">
                <input className="form-control outline-none border-0 flex-1 fs-9 px-0" type="text" placeholder="Write message" />
                <label className="btn btn-link d-flex p-0 text-body-quaternary fs-9 border-0" htmlFor="supportChatPhotos"><span className="fa-solid fa-image"></span></label>
                <input className="d-none" type="file" accept="image/*" id="supportChatPhotos" />
                <label className="btn btn-link d-flex p-0 text-body-quaternary fs-9 border-0" htmlFor="supportChatAttachment"> <span className="fa-solid fa-paperclip"></span></label>
                <input className="d-none" type="file" id="supportChatAttachment" />
              </div>
              <button className="btn p-0 border-0 send-btn"><span className="fa-solid fa-paper-plane fs-9"></span></button>
            </div>
          </div>
        </div>
        <button className="btn btn-support-chat p-0 border border-translucent"><span className="fs-8 btn-text text-primary text-nowrap">Chat demo</span><span className="ping-icon-wrapper mt-n4 ms-n6 mt-sm-0 ms-sm-2 position-absolute position-sm-relative"><span className="ping-icon-bg"></span><span className="fa-solid fa-circle ping-icon"></span></span><span className="fa-solid fa-headset text-primary fs-8 d-sm-none"></span><span className="fa-solid fa-chevron-down text-primary fs-7"></span></button>
      </div>
    </main>
    
   {/* <Customizer /> */}

    </>
  );
};

export default Dashboard;

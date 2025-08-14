import { useState } from "react";
import DarkContainer from "../common/containers/DarkContainer";
import { infoFooterData } from "@/data/infoFooterData";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import Footer from "../footer/Footer";
import { MdOutlineEmail } from "react-icons/md";
import Button from "../common/buttons/Button";
import { ChevronRight } from "lucide-react";

const InfoFooter = () => {
  const { quickLinks, address } = infoFooterData;
  const [email, setEmail] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Email submitted:", email);
    alert(`Email submitted: ${email}`);
    setEmail("");
  };

  return (
    <div>
      <DarkContainer className="mt-30 w-full h-[28rem]">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
            {/* Col 1: Logo + brand */}
            <div className="flex flex-col ">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/cubi_logo.png"
                  alt="Yampe.dev"
                  className="w-12 h-12"
                />
                <h1 className="text-3xl font-bold text-white mx-2">
                  Yampe.dev
                </h1>
              </div>

              {/* (Opcional) enlaces sociales si quieres mostrarlos */}
              {/*{socialLinks?.length ? (
                <ul className="mt-6 flex flex-wrap gap-4 text-zinc-400">
                  {socialLinks.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white underline-offset-4 hover:underline"
                      >
                        {s.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null} */}
            </div>

            {/* Col 2: Quick Link */}
            <div className="">
              <h4 className="mb-5 text-[18px] font-semibold text-white">
                Quick Link
              </h4>
              <nav aria-label="Quick links">
                <ul className="flex gap-8">
                  {quickLinks?.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.href}
                        className="text-zinc-300 transition hover:text-white"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <form
                onSubmit={handleOnSubmit}
                className="flex gap-6 mt-6 items-start"
              >
                <div className="relative w-full">
                  <MdOutlineEmail
                    className="pointer-events-none absolute left-3 top-[2.2rem] -translate-y-1/2 text-[1.2rem] text-color0"
                    aria-hidden
                  />
                  <input
                    type="email"
                    name="subscribeEmail"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Email Address"
                    className="
        mt-4 w-full
        bg-transparent text-zinc-300 placeholder:text-zinc-500
        pl-10 pr-4 py-2
        border-0 border-b border-b-zinc-600
        focus:border-b-lime-400 focus:outline-none focus:ring-0
      "
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-4 px-6 py-2.5 font-bold text-black transition-colors"
                >
                  <span className="text-black">Subscribe</span>
                  <ChevronRight className="ml-2 h-4 w-4 text-black" />
                </Button>
              </form>
            </div>

            {/* Col 3: Address */}
            <div className="">
              <h4 className="mb-5 text-lg font-semibold text-white">Address</h4>
              <address className="not-italic space-y-4 text-zinc-300">
                <p className="flex items-start gap-3">
                  <FiMapPin className="mt-1 shrink-0 text-color0" />
                  <span className="text-[18px]">{address?.street}</span>
                </p>
                <p className="flex items-start gap-3">
                  <FiMail className="mt-1 shrink-0 text-color0" />
                  <a
                    href={`mailto:${address?.email}`}
                    className="transition hover:text-white text-[18px]"
                  >
                    {address?.email}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <FiPhone className="mt-1 shrink-0 text-color0" />
                  <a
                    href={`tel:${address?.phone.replace(/[\s()\-]/g, "")}`}
                    className="transition hover:text-white text-[18px]"
                  >
                    {address?.phone}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </DarkContainer>

      <Footer />
    </div>
  );
};

export default InfoFooter;

import { useRouter } from "next/navigation";
import { linkType } from "@/types/type";
import { useState } from "react";

type LinkProps = {
    link: linkType;
    removeLink: (id: string) => void;
    userLinks: linkType[];
  };
  
  const Link: React.FC<LinkProps> = ({ link, removeLink, userLinks }) => {
    const router = useRouter(); // Initialize useRouter
    const [shareUrl, setShareUrl]=useState("")
  const handleShare = () => {
    const newShareUrl = `${window.location.origin}/share/${link.id}`;
    setShareUrl(newShareUrl);
    navigator.clipboard.writeText(shareUrl);
    alert(`The Link has been copied to clipboard`);
  };
    return (
        <div key={link.id} className="bg-[#fafafa] rounded-xl p-5">
                    <div className="flex mb-4 justify-between">
                      <div className="flex text-[#737373] gap-2 items-center text-base font-bold">
                        <svg
                          width="12"
                          height="6"
                          viewBox="0 0 12 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="12" height="1" fill="#737373" />
                          <rect y="5" width="12" height="1" fill="#737373" />
                        </svg>{" "}
                        Link # {userLinks.indexOf(link) + 1}
                      </div>
                      <a href={shareUrl} className="cursor-pointer"><code>{shareUrl}</code></a>
                      <div className="inline-flex gap-4">
                      <button
                        className="text-[#737373] "
                        onClick={handleShare}
                      >
                        Share
                      </button>
                      <button
                        className="text-[#737373] "
                        onClick={() => removeLink(link.id)}
                      >
                        Remove
                      </button>
                      </div>
                    </div>
                    <label htmlFor="email">
                      <p className="text-sm text-[#333333] mb-1">Platform</p>
                      <div className="flex customShadow bg-white rounded-lg  px-4 border justify-between items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#737373"
                          className="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                          />
                        </svg>

                        <input
                          type="text"
                          name="email"
                          disabled
                          value={link.platform}
                          id="email"
                          placeholder="e.g. alex@email.com"
                          className="w-[90%] bg-white py-3 outline-none"
                        />
                        <svg
                          width="14"
                          height="9"
                          viewBox="0 0 14 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L13 1"
                            stroke="#633CFF"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </label>
                    <label htmlFor="email">
                      <p className="text-sm text-[#333333] mb-1">Link</p>
                      <div className="flex customShadow bg-white rounded-lg  px-4 border justify-between items-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.52312 10.7207C7.59304 10.7903 7.64852 10.8731 7.68638 10.9643C7.72423 11.0555 7.74372 11.1532 7.74372 11.2519C7.74372 11.3506 7.72423 11.4484 7.68638 11.5395C7.64852 11.6307 7.59304 11.7135 7.52312 11.7832L7.15187 12.1544C6.44839 12.8579 5.49425 13.2531 4.49937 13.2531C3.50449 13.2531 2.55036 12.8579 1.84687 12.1544C1.14339 11.4509 0.748173 10.4968 0.748173 9.5019C0.748173 8.50702 1.14339 7.55289 1.84687 6.8494L3.35437 5.34253C4.0303 4.66493 4.93973 4.27142 5.89639 4.2426C6.85304 4.21378 7.78451 4.55184 8.5 5.18753C8.57387 5.25319 8.63408 5.33276 8.6772 5.42169C8.72032 5.51062 8.7455 5.60717 8.7513 5.70583C8.7571 5.8045 8.74342 5.90333 8.71102 5.99671C8.67863 6.09008 8.62816 6.17616 8.5625 6.25003C8.49684 6.3239 8.41727 6.38411 8.32834 6.42723C8.23941 6.47035 8.14286 6.49552 8.04419 6.50133C7.94553 6.50713 7.84669 6.49345 7.75332 6.46105C7.65995 6.42866 7.57387 6.37819 7.5 6.31253C7.07095 5.93148 6.51252 5.72877 5.93895 5.74584C5.36537 5.76292 4.81999 5.9985 4.41437 6.4044L2.90812 7.9094C2.4861 8.33143 2.24901 8.90382 2.24901 9.50065C2.24901 10.0975 2.4861 10.6699 2.90812 11.0919C3.33015 11.5139 3.90254 11.751 4.49937 11.751C5.09621 11.751 5.6686 11.5139 6.09062 11.0919L6.46187 10.7207C6.53153 10.6509 6.61424 10.5956 6.70529 10.5579C6.79634 10.5201 6.89394 10.5007 6.9925 10.5007C7.09106 10.5007 7.18866 10.5201 7.2797 10.5579C7.37075 10.5956 7.45347 10.6509 7.52312 10.7207ZM12.1531 1.84565C11.4491 1.14325 10.4951 0.748779 9.50062 0.748779C8.5061 0.748779 7.55219 1.14325 6.84812 1.84565L6.47687 2.2169C6.33598 2.3578 6.25682 2.54889 6.25682 2.74815C6.25682 2.94741 6.33598 3.13851 6.47687 3.2794C6.61777 3.4203 6.80887 3.49945 7.00812 3.49945C7.20738 3.49945 7.39848 3.4203 7.53937 3.2794L7.91062 2.90815C8.33265 2.48613 8.90504 2.24903 9.50187 2.24903C10.0987 2.24903 10.6711 2.48613 11.0931 2.90815C11.5152 3.33018 11.7522 3.90257 11.7522 4.4994C11.7522 5.09624 11.5152 5.66863 11.0931 6.09065L9.58625 7.59815C9.18027 8.00388 8.63459 8.23912 8.06087 8.25574C7.48715 8.27235 6.92877 8.06908 6.5 7.68753C6.42613 7.62187 6.34005 7.5714 6.24668 7.539C6.15331 7.50661 6.05447 7.49292 5.9558 7.49873C5.85714 7.50453 5.76059 7.52971 5.67166 7.57283C5.58273 7.61595 5.50316 7.67616 5.4375 7.75003C5.37184 7.8239 5.32137 7.90997 5.28898 8.00335C5.25658 8.09672 5.24289 8.19556 5.2487 8.29422C5.2545 8.39288 5.27968 8.48944 5.3228 8.57837C5.36592 8.6673 5.42613 8.74687 5.5 8.81253C6.21499 9.44807 7.14583 9.78634 8.10204 9.75811C9.05824 9.72987 9.9675 9.33727 10.6437 8.66065L12.1512 7.15378C12.8545 6.44989 13.2496 5.49571 13.25 4.50073C13.2503 3.50575 12.8559 2.55129 12.1531 1.8469V1.84565Z"
                            fill="#737373"
                          />
                        </svg>

                        <input
                          type="url"
                          name="email"
                          disabled
                          value={"https://" + link.url}
                          id="email"
                          placeholder="e.g. alex@email.com"
                          className="w-[95%] lowercase bg-white py-3 outline-none"
                        />
                      </div>
                    </label>
                  </div>
    );
}

export default Link;
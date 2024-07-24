import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const TopNav = () => {
  const [signedIn, setSignedIn] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      setSignedIn(false);
    } else {
      setSignedIn(true);
    }
  }, [user]);

  return (
    <>
      {signedIn && (
        <div className="w-full p-6">
          <div className="flex justify-between items-center p-4 rounded-xl bg-white mx-auto">
            <div aria-label="logo">
              <img src="/logoWithText.svg" alt="logo" />
            </div>
            <div aria-label="middle content" className="gap-4 flex">
              <Link href="/links" className="bg-[#EFEBFF] inline-flex items-center gap-2 py-3 px-7 text-[#633CFF] rounded-lg"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.15399 12.6508C9.24139 12.7379 9.31074 12.8413 9.35806 12.9553C9.40537 13.0693 9.42973 13.1914 9.42973 13.3148C9.42973 13.4382 9.40537 13.5604 9.35806 13.6743C9.31074 13.7883 9.24139 13.8918 9.15399 13.9789L8.68993 14.4429C7.81057 15.3223 6.61791 15.8163 5.3743 15.8163C4.1307 15.8163 2.93804 15.3223 2.05868 14.4429C1.17932 13.5636 0.685303 12.3709 0.685303 11.1273C0.685303 9.88372 1.17932 8.69105 2.05868 7.81169L3.94305 5.9281C4.78796 5.0811 5.92476 4.58921 7.12057 4.55319C8.31639 4.51717 9.48073 4.93974 10.3751 5.73435C10.4674 5.81642 10.5427 5.91588 10.5966 6.02705C10.6505 6.13821 10.682 6.2589 10.6892 6.38223C10.6965 6.50556 10.6794 6.62911 10.6389 6.74582C10.5984 6.86254 10.5353 6.97014 10.4532 7.06247C10.3711 7.15481 10.2717 7.23007 10.1605 7.28397C10.0493 7.33787 9.92866 7.36934 9.80533 7.3766C9.682 7.38385 9.55845 7.36675 9.44174 7.32625C9.32502 7.28576 9.21742 7.22267 9.12509 7.1406C8.58877 6.66429 7.89074 6.4109 7.17377 6.43224C6.4568 6.45359 5.77508 6.74807 5.26805 7.25544L3.38524 9.13669C2.85771 9.66422 2.56135 10.3797 2.56135 11.1258C2.56135 11.8718 2.85771 12.5873 3.38524 13.1148C3.91277 13.6423 4.62826 13.9387 5.3743 13.9387C6.12035 13.9387 6.83583 13.6423 7.36337 13.1148L7.82743 12.6508C7.9145 12.5636 8.01789 12.4944 8.1317 12.4473C8.24551 12.4001 8.36751 12.3758 8.49071 12.3758C8.61391 12.3758 8.73591 12.4001 8.84972 12.4473C8.96353 12.4944 9.06692 12.5636 9.15399 12.6508ZM14.9415 1.557C14.0614 0.678998 12.869 0.185913 11.6259 0.185913C10.3827 0.185913 9.19032 0.678998 8.31024 1.557L7.84618 2.02107C7.67006 2.19719 7.57112 2.43606 7.57112 2.68513C7.57112 2.9342 7.67006 3.17307 7.84618 3.34919C8.0223 3.52531 8.26117 3.62426 8.51024 3.62426C8.75931 3.62426 8.99818 3.52531 9.1743 3.34919L9.63837 2.88513C10.1659 2.3576 10.8814 2.06123 11.6274 2.06123C12.3735 2.06123 13.089 2.3576 13.6165 2.88513C14.144 3.41266 14.4404 4.12815 14.4404 4.87419C14.4404 5.62023 14.144 6.33572 13.6165 6.86325L11.7329 8.74763C11.2254 9.25479 10.5433 9.54884 9.82618 9.56961C9.10903 9.59038 8.41105 9.33629 7.87509 8.85935C7.78275 8.77727 7.67515 8.71419 7.55844 8.67369C7.44172 8.6332 7.31817 8.61609 7.19484 8.62335C7.07152 8.6306 6.95082 8.66208 6.83966 8.71597C6.7285 8.76987 6.62904 8.84514 6.54696 8.93747C6.46488 9.02981 6.4018 9.13741 6.36131 9.25412C6.32081 9.37084 6.30371 9.49439 6.31096 9.61772C6.31821 9.74104 6.34969 9.86173 6.40359 9.9729C6.45748 10.0841 6.53275 10.1835 6.62509 10.2656C7.51882 11.06 8.68238 11.4829 9.87763 11.4476C11.0729 11.4123 12.2095 10.9215 13.0548 10.0758L14.9391 8.19216C15.8182 7.3123 16.3121 6.11957 16.3126 4.87585C16.313 3.63212 15.8199 2.43905 14.9415 1.55857V1.557Z" fill="#633CFF"/>
</svg>
Links
</Link>
<Link href="/profile" className="text-[#737373] inline-flex items-center gap-2"><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.5 0.5625C6.83122 0.5625 5.19992 1.05735 3.81238 1.98448C2.42484 2.9116 1.34338 4.22936 0.70477 5.77111C0.0661559 7.31286 -0.100935 9.00936 0.224628 10.6461C0.550191 12.2828 1.35379 13.7862 2.53379 14.9662C3.7138 16.1462 5.21721 16.9498 6.85393 17.2754C8.49064 17.6009 10.1871 17.4338 11.7289 16.7952C13.2706 16.1566 14.5884 15.0752 15.5155 13.6876C16.4427 12.3001 16.9375 10.6688 16.9375 9C16.935 6.763 16.0453 4.61833 14.4635 3.03653C12.8817 1.45473 10.737 0.564981 8.5 0.5625ZM4.71641 14.357C5.15163 13.7619 5.72107 13.2779 6.37849 12.9442C7.0359 12.6106 7.76276 12.4367 8.5 12.4367C9.23725 12.4367 9.9641 12.6106 10.6215 12.9442C11.2789 13.2779 11.8484 13.7619 12.2836 14.357C11.1778 15.1412 9.85565 15.5625 8.5 15.5625C7.14436 15.5625 5.82221 15.1412 4.71641 14.357ZM6.3125 8.375C6.3125 7.94235 6.4408 7.51942 6.68116 7.15969C6.92153 6.79996 7.26317 6.51958 7.66288 6.35401C8.0626 6.18845 8.50243 6.14513 8.92676 6.22953C9.3511 6.31394 9.74087 6.52228 10.0468 6.8282C10.3527 7.13413 10.5611 7.52391 10.6455 7.94824C10.7299 8.37257 10.6866 8.81241 10.521 9.21212C10.3554 9.61183 10.075 9.95347 9.71531 10.1938C9.35558 10.4342 8.93265 10.5625 8.5 10.5625C7.91984 10.5625 7.36344 10.332 6.95321 9.9218C6.54297 9.51156 6.3125 8.95516 6.3125 8.375ZM13.6563 13.0578C13.0486 12.2849 12.2741 11.6595 11.3906 11.2281C11.9537 10.658 12.3355 9.93402 12.4881 9.14738C12.6408 8.36074 12.5573 7.54653 12.2484 6.80718C11.9394 6.06783 11.4187 5.43637 10.7517 4.99223C10.0847 4.5481 9.30132 4.31112 8.5 4.31112C7.69869 4.31112 6.91528 4.5481 6.24831 4.99223C5.58135 5.43637 5.06062 6.06783 4.75165 6.80718C4.44267 7.54653 4.35925 8.36074 4.51187 9.14738C4.66449 9.93402 5.04634 10.658 5.60938 11.2281C4.72592 11.6595 3.9514 12.2849 3.34375 13.0578C2.58051 12.0903 2.10512 10.9274 1.972 9.70225C1.83888 8.47711 2.05341 7.23925 2.59104 6.13037C3.12867 5.02148 3.96767 4.08639 5.01199 3.43212C6.05631 2.77786 7.26375 2.43086 8.4961 2.43086C9.72844 2.43086 10.9359 2.77786 11.9802 3.43212C13.0245 4.08639 13.8635 5.02148 14.4012 6.13037C14.9388 7.23925 15.1533 8.47711 15.0202 9.70225C14.8871 10.9274 14.4117 12.0903 13.6484 13.0578H13.6563Z" fill="#737373"/>
</svg>
Profile Details</Link>
            </div>
            <div aria-label="end content" className="text-[#633CFF] border rounded-lg py-3 px-7 border-[#633CFF]">
              Preview
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;

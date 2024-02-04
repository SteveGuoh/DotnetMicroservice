import { updateAuctionTest } from "./actions/authActions";
import Listing from "./auctions/Listing";

export default function Home() {
  // updateAuctionTest().then((res) => console.log(res));
  return (
    <div>
      <Listing />
    </div>
  );
}

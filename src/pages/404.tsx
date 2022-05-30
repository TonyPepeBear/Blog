import * as React from "react";
import MainLayout from "../components/layouts/main-layouts";
import ReadMoreButton from "../components/read-more-button";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center gap-6">
        <img
          className="w-full rounded-full"
          src="https://imagedelivery.net/cdkaXPuFls5qlrh3GM4hfA/139d267d-742f-4beb-e0f2-2a7f2aa82a00/public"
        />
        <ReadMoreButton href="/" title="Go Home" />
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;

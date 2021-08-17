import { Spinner } from "@chakra-ui/react";

export function SpinnerLoader() {
  return (
    <div className="flex justify-center items-center mt-4 ">
      <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
    </div>
  );
}

import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    // convert boolean value>>>>>>>>>>> { !! }
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user?.email}`);
      //   console.log(result);
      return data.role;
    },
  });
  //   return { role, isRoleLoading };
  return [role, isRoleLoading];
};

export default useRole;

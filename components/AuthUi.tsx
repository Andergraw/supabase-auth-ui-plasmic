import { mutate } from "swr";
import { PLASMIC_AUTH_DATA_KEY } from "@/utils/cache-keys";
import { useRouter } from "next/router";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { createPagesBrowserClient, User } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";

import styles from "./AuthUi.module.css";
const AUTH_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/auth`;

export const AuthUiForm = ({ className }: { className?: string }) => {
  const [supabaseBrowserClient] = useState(() => createPagesBrowserClient());
  useEffect(() => {
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (event, session) => {
        // console.log("On Auth State Change:", event, session);
        if (event === "INITIAL_SESSION") {
          // handle initial session
        } else if (event === "SIGNED_IN") {
          mutate(PLASMIC_AUTH_DATA_KEY);
        } else if (event === "SIGNED_OUT") {
          // handle sign out event
          mutate(PLASMIC_AUTH_DATA_KEY);
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []); // Run effect only once on component mount

  return (
    <div className={className}>
      <Auth
        supabaseClient={supabaseBrowserClient}
        providers={["google"]}
        appearance={{ theme: ThemeSupa }}
        redirectTo={AUTH_URL} // Without the redirect pointing to auth (where the listener is), i cannot get the SIGN_IN event
      />
    </div>
  );
};

export const AuthUiButton: React.FC = ({
  className,
}: {
  className?: string;
}) => {
  const router = useRouter();
  const [supabaseBrowserClient] = useState(() => createPagesBrowserClient());
  useEffect(() => {
    const { data: authListener } = supabaseBrowserClient.auth.onAuthStateChange(
      (event, session) => {
        // console.log("On Auth State Change:", event, session);
        if (event === "INITIAL_SESSION") {
          // handle initial session
        } else if (event === "SIGNED_IN") {
          setUser(session?.user!);
        } else if (event === "SIGNED_OUT") {
          // handle sign out event
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe(); // Unsubscribe when component unmounts
    };
  }, []); // Run effect only once on component mount

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabaseBrowserClient.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await supabaseBrowserClient.auth.signOut();
      await mutate(PLASMIC_AUTH_DATA_KEY);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={className}>
      {user ? (
        // If user exists, render logout button
        <button
          className={`${styles["auth-button"]} ${styles["auth-button-primary"]}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        // If no user, render login button
        <button
          className={`${styles["auth-button"]} ${styles["auth-button-primary"]}`}
          onClick={() => router.push("/auth")}
        >
          Login
        </button>
      )}
    </div>
  );
};

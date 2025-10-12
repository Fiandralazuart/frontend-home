import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { onErrorHandler } from "@/libs/axios/responseHandler";
import { ToasterProvider } from "@/context/ToasterContex";
import AppShells from "@/components/common/AppShells";
import { Analytics } from "@vercel/analytics/next"

// queryCache digunakan untuk menyimpan data hasil query yang kemudian akan digunakan untuk handle terhadap error

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: onErrorHandler,
	}),
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			throwOnError: false,
		},
	},
	mutationCache: new MutationCache({
		onError: onErrorHandler,
	}),
});

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const router = useRouter();

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<HeroUIProvider navigate={router.push}>
					<NextThemesProvider attribute="class" defaultTheme="light">
						<ToasterProvider>
							<AppShells>
								<Component {...pageProps} />
							</AppShells>
						</ToasterProvider>
					</NextThemesProvider>
				</HeroUIProvider>
			</QueryClientProvider>
			<Analytics />
		</SessionProvider>
	);
}

export const fonts = {
	sans: fontSans.style.fontFamily,
	mono: fontMono.style.fontFamily,
};

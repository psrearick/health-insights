import { CurrentUrlOptions, UrlOptions } from '@/types';
import { usePage } from '@inertiajs/react';

export function resolveUrl(to?: string | UrlOptions): string {
  if (!to) {
    return route().current() as string;
  }

  if (typeof to === 'string') {
    if (to.startsWith('/') || to.startsWith('http')) {
      return to;
    }

    return route(to);
  }

  if (typeof to !== 'object') {
    return route().current() as string;
  }

  if (to.name) {
    return route(to.name, to.params);
  }

  if (to.url) {
    return to.url;
  }

  if (to.route) {
    return route(to.route, to.params);
  }

  return route().current() as string;
}

export function isCurrentRoute(
  to: string | UrlOptions,
  options: CurrentUrlOptions = {}
) {
  const { exact = false, current } = options;

  const currentUrl =
    current || (typeof window !== 'undefined' ? window.location.pathname : '');
  let isCurrent = false;

  if (typeof to === 'string' && !to.startsWith('/') && !to.startsWith('http')) {
    isCurrent = route().current(to);
  }

  if (typeof to === 'object' && to?.name) {
    isCurrent = route().current(to.name, to.params);
  }

  if (typeof isCurrent === 'undefined') {
    return false;
  }

  try {
    const resolvedUrl = resolveUrl(to);
    const targetUrl = resolvedUrl
      ? new URL(resolvedUrl, window.location.origin).pathname
      : '';

    if (exact) {
      return currentUrl === targetUrl;
    }

    if (targetUrl === '/') {
      return currentUrl === '/';
    }

    return currentUrl.startsWith(targetUrl);
  } catch (_error) {
    return false;
  }
}

export function useIsCurrentRoute(
  to: string | UrlOptions,
  options: CurrentUrlOptions = {}
) {
  const { url: currentUrl } = usePage();
  const current = new URL(currentUrl, window.location.origin).pathname;

  return isCurrentRoute(to, { ...options, current });
}

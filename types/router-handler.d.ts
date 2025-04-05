import { NextRequest } from 'next/server';

export interface RouteContext<T extends Record<string, string>> {
    params: T;
}

export type RouteHandler<T extends Record<string, string>> = (
    request: NextRequest,
    context: RouteContext<T>
) => Promise<Response>

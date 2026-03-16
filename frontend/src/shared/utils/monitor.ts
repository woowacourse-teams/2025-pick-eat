import * as Sentry from '@sentry/react';

const getCurrentPage = (): string => {
    return window.location.pathname + window.location.search;
}

const openReportForm = async () => {
    const feedback = Sentry.getFeedback();
    const form = await feedback?.createForm();
    if (form) {
        form.appendToDom();
        form.open();
    }
};

const reportClientRateLimitError = (
    method: string,
    endPoint: string,
    timestamps: number[]
): void => {
    Sentry.withScope(scope => {
        scope.setTag('rate_limit_source', 'client');
        scope.setExtra('page', getCurrentPage());
        scope.setExtra('api_method', method);
        scope.setExtra('api_endpoint', endPoint);
        scope.setExtra('rate_limit_timestamps', timestamps);
        scope.setExtra('rate_limit_request_count', timestamps.length);
        Sentry.captureMessage(
            'Client rate limit exceeded (possible infinite loop)',
            'warning'
        );
    });
};

const reportServerTooManyRequest = (
    method: string,
    endPoint: string,
    serverMessage?: string
): void => {
    Sentry.withScope(scope => {
        scope.setTag('rate_limit_source', 'server');
        scope.setExtra('page', getCurrentPage());
        scope.setExtra('api_method', method);
        scope.setExtra('api_endpoint', endPoint);
        if (serverMessage) {
            scope.setExtra('server_message', serverMessage);
        }
        Sentry.captureMessage('Server 429 Too Many Requests', 'warning');
    });
}

export const monitor = {
    openReportForm,
    reportClientRateLimitError,
    reportServerTooManyRequest,
};
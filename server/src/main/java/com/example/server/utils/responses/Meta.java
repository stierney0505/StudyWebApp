package com.example.server.utils.responses;

public class Meta {
    private String _url;

    public Meta() {}

    public Meta(String url) { _url=url; }

    public String getUrl() { return _url; }

    public void setUrl(String url) { _url=url; }
}

String.prototype.startsWith = function(prefix)
{
    return (this.substr(0, prefix.length) === prefix);
}

String.prototype.endsWith = function(suffix)
{
    return (this.substr(this.length - suffix.length) === suffix);
}

String.prototype.contains = function(txt)
{
    return (this.indexOf(txt) >= 0);
}
function f_s(s, p_t, p_m)
    f_b = 174.61
    r_et = [1.0, 1.122, 1.189, 1.335, 1.498, 1.587, 1.782]
    r_ji = [1.0, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5]
    
    fr = []
    for o in -3:6
        for i in 1:7
            push!(fr, f_b * (2.0^o) * r_et[i])
            push!(fr, f_b * (2.0^o) * r_ji[i])
        end
    end
    
    fr = filter(x -> 20.0 <= x <= 20000.0, fr)
    n = length(fr)
    m = zeros(n, n)
    for i in 1:n, j in 1:n
        d = abs(fr[i] - fr[j])
        m[i,j] = exp(-d / 1000.0) * cos(d * 0.001)
    end
    
    for k in 1:3
        tmp = copy(m)
        for i in 2:n-1, j in 2:n-1
            m[i,j] = 0.6 * tmp[i,j] + 0.1 * (tmp[i-1,j] + tmp[i+1,j] + tmp[i,j-1] + tmp[i,j+1])
        end
    end
    
    l = Int(s * 0.1)
    o = zeros(l)
    dt = 1.0 / s
    phi = zeros(n)
    
    for k in 1:l
        v = 0.0
        for i in 1:n
            pr = p_t[i % length(p_t) + 1] * p_m[i % length(p_m) + 1]
            if pr > 0.4
                phi[i] += 2.0 * pi * fr[i] * dt
                v += sin(phi[i]) * pr * (1.0 + 0.2 * sin(phi[i] * 0.5))
            end
        end
        o[k] = v
    end
    
    m_v = 0.0
    for i in 1:l
        if abs(o[i]) > m_v m_v = abs(o[i]) end
    end
    if m_v > 0.0
        for i in 1:l o[i] /= m_v end
    end
    
    return o, m
end
